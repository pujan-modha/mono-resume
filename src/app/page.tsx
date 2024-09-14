"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeForm from "@/components/forms/ResumeForm";
import Resume from "@/components/template/Resume";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/app/schemas/ResumeSchema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { funFacts, FunFact } from "@/app/data/facts";
import Image from "next/image";

const PDF_LIMIT = 60;
const LIMIT_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COOLDOWN_PERIOD = 10000; // 10 seconds in milliseconds

const canGeneratePDF = (count: number, firstTime: number) => {
  const currentTime = Date.now();
  return currentTime - firstTime > LIMIT_PERIOD || count < PDF_LIMIT;
};

const calculateTimeRemaining = (firstGenerationTime: number) => {
  const currentTime = Date.now();
  const endTime = firstGenerationTime + LIMIT_PERIOD;
  const timeRemaining = Math.max(endTime - currentTime, 0);
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  return { hours, minutes };
};

const fetchTotalPDFsGenerated = async () => {
  try {
    const response = await fetch("/api/pdf", {
      method: "GET",
    });

    const data = await response.json();

    if (response.ok) {
      return data.count;
    } else {
      console.error("Failed to fetch PDF count:", data.error);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching PDF count:", error);
    return 0;
  }
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [totalPDFsGenerated, setTotalPDFsGenerated] = useState<number>(0);
  const [, setPdfGenerationCount] = useState<number>(0);
  const [, setFirstGenerationTime] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [currentFunFact, setCurrentFunFact] = useState<FunFact | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);
  const [, setLimitReached] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 24, minutes: 0 });
  const [remainingGenerations, setRemainingGenerations] =
    useState<number>(PDF_LIMIT);
  const [lastGenerationTime, setLastGenerationTime] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  const mainResumeRef = useRef(null);
  const previewResumeRef = useRef(null);

  const handleFormSubmit = (data: ResumeData) => {
    setResumeData(data);
  };

  const getRandomFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    return funFacts[randomIndex];
  };

  const getActiveResumeRef = () => {
    return isPreviewOpen ? previewResumeRef : mainResumeRef;
  };

  const generatePDF = async () => {
    const currentTime = Date.now();
    if (currentTime - lastGenerationTime < COOLDOWN_PERIOD) {
      console.log(
        `Please wait ${cooldownRemaining} seconds before generating another PDF.`
      );
      return;
    }

    setLastGenerationTime(currentTime);
    setCooldownRemaining(10);

    const storedData = localStorage.getItem("pdfGenerationData");
    let count = 0;
    let firstTime = 0;
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      count = parsedData.count;
      firstTime = parsedData.firstTime || Date.now(); // Ensure firstTime is always a number
    }

    if (!canGeneratePDF(count, firstTime)) {
      const remaining = calculateTimeRemaining(firstTime);
      setTimeRemaining(remaining);
      setLimitReached(true);
      setShowLimitDialog(true);
      return;
    }

    const activeResumeRef = getActiveResumeRef();
    if (!activeResumeRef.current) return;

    setIsDownloading(true);
    setShowDialog(true);
    setCurrentFunFact(getRandomFunFact());
    setIsDownloadComplete(false);
    setLimitReached(false);
    console.log("Starting PDF generation");

    try {
      const styles = document.getElementsByTagName("style");
      const links = document.getElementsByTagName("link");
      let styleContent = "";

      for (let i = 0; i < styles.length; i++) {
        styleContent += styles[i].innerHTML;
      }

      for (let i = 0; i < links.length; i++) {
        if (links[i].rel === "stylesheet") {
          const response = await fetch(links[i].href);
          const css = await response.text();
          styleContent += css;
        }
      }

      const htmlContent = `
        <html>
          <head>
            <style>${styleContent}</style>
          </head>
          <body>
            ${(activeResumeRef.current as HTMLElement).innerHTML}
          </body>
        </html>
      `;

      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html: htmlContent }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `resume.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        const newTotalCount = await fetchTotalPDFsGenerated();
        setTotalPDFsGenerated(newTotalCount);
        const newCount = count + 1;
        const newFirstTime = firstTime === 0 ? Date.now() : firstTime;
        localStorage.setItem(
          "pdfGenerationData",
          JSON.stringify({ count: newCount, firstTime: newFirstTime })
        );
        setPdfGenerationCount(newCount);
        setFirstGenerationTime(newFirstTime);
        setIsDownloadComplete(true);
        const remaining = Math.max(PDF_LIMIT - newCount, 0);
        setRemainingGenerations(remaining);
        const newTimeRemaining = calculateTimeRemaining(newFirstTime);
        setTimeRemaining(newTimeRemaining);
      } else {
        console.error("Failed to generate PDF:", await response.text());
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
      console.log("PDF generation process finished");
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (cooldownRemaining > 0) {
      intervalId = setInterval(() => {
        setCooldownRemaining((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [cooldownRemaining]);

  const closeAlertDialog = () => {
    setShowDialog(false);

    // Use setTimeout to delay the state resets until after the dialog has closed
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloadComplete(false);
      setLimitReached(false);
      setCurrentFunFact(null);
    }, 0);
  };

  const closeLimitDialog = () => {
    setShowLimitDialog(false);
  };

  const downloadHTML = async () => {
    const activeResumeRef = getActiveResumeRef();
    if (!activeResumeRef.current || !resumeData) return;

    setShowDialog(true);
    setCurrentFunFact(getRandomFunFact());
    setIsDownloadComplete(true);

    const styles = document.getElementsByTagName("style");
    const links = document.getElementsByTagName("link");
    let styleContent = "";

    for (let i = 0; i < styles.length; i++) {
      styleContent += styles[i].innerHTML;
    }

    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === "stylesheet") {
        try {
          const response = await fetch(links[i].href);
          const css = await response.text();
          styleContent += css;
        } catch (error) {
          console.error("Error fetching stylesheet:", error);
        }
      }
    }

    styleContent += `
      @media print {
        body * {
          display: none;
        }
        body:after {
          content: 'Kindly visit monoresume.com to get your resume in PDF';
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 16px;
          text-align: center;
        }
      }
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="title" content="${resumeData.HeaderFirstName} ${
      resumeData.HeaderLastName
    } - Resume">
        <title>${resumeData.HeaderFirstName} ${
      resumeData.HeaderLastName
    } - Resume</title>
        <meta name="description" content="${resumeData.HeaderTitle}">
        <style>${styleContent}</style>
      </head>
      <body>
      <style>
        .download-main {
          padding: 2.5%;
        }
      </style>
        ${(activeResumeRef.current as HTMLElement).innerHTML}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      const count = await fetchTotalPDFsGenerated();
      setTotalPDFsGenerated(count);

      const storedData = localStorage.getItem("pdfGenerationData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const remaining = Math.max(PDF_LIMIT - parsedData.count, 0);
        setRemainingGenerations(remaining);
        const storedFirstTime = parsedData.firstTime || Date.now(); // Ensure a valid number
        const remainingTime = calculateTimeRemaining(storedFirstTime);
        setTimeRemaining(remainingTime);
        setFirstGenerationTime(storedFirstTime);
      }
    };
    fetchData();

    const defaultSectionOrder = [
      "Overview",
      "Skills",
      "Experience",
      "Publications",
      "Projects",
      "Education",
      "Certifications",
      "Achievements",
      "Extracurricular",
      "Volunteering",
    ];
    setSectionOrder(defaultSectionOrder);

    // Set up an interval to update the time remaining every minute
    const intervalId = setInterval(() => {
      const storedData = localStorage.getItem("pdfGenerationData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const storedFirstTime = parsedData.firstTime || Date.now(); // Ensure a valid number
        const remainingTime = calculateTimeRemaining(storedFirstTime);
        setTimeRemaining(remainingTime);
      }
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        if (cooldownRemaining > 0) {
          console.log(
            `Please wait ${cooldownRemaining} seconds before generating another PDF.`
          );
          return;
        }

        const storedData = localStorage.getItem("pdfGenerationData");
        let count = 0;
        let firstTime = 0;
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          count = parsedData.count;
          firstTime = parsedData.firstTime;
        }
        if (canGeneratePDF(count, firstTime)) {
          generatePDF();
        } else {
          const remaining = calculateTimeRemaining(firstTime);
          setTimeRemaining(remaining);
          setLimitReached(true);
          setShowLimitDialog(true);
        }
      } else if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        downloadHTML();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="bg-gray-100 h-[100svh] overflow-hidden">
      <main className="mx-auto">
        <div className="grid xl:grid-cols-2">
          <div className="border-r">
            <div className="fixed left-0 top-0 w-full xl:w-1/2 z-50">
              <div className="sticky top-0 bg-white border-b shadow-sm">
                <div className="max-w-screen-md flex flex-col w-full m-auto px-4 2xl:px-0">
                  <div className="flex h-16 w-full">
                    <div className="my-auto text-xl lg:text-xl font-medium cursor-pointer hover:bg-mono_primary bg-mono_foreground duration-300 h-16 text-mono_background select-none flex">
                      <div className="my-auto px-1">
                        <p className="text-nowrap leading-none">Mono</p>
                        <p className="text-nowrap leading-none">Resume</p>
                      </div>
                    </div>
                    <div className="flex ml-auto my-auto gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              disabled={!resumeData}
                              onClick={() =>
                                downloadHTML().catch(console.error)
                              }
                              variant="secondary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-4 mr-1"
                              >
                                <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                              </svg>
                              <p className="block lg:hidden">HTML</p>
                              <p className="hidden lg:block">Download HTML</p>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="hidden lg:block">
                            Or press Ctrl + S
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              disabled={
                                !resumeData ||
                                isDownloading ||
                                cooldownRemaining > 0
                              }
                              onClick={generatePDF}
                            >
                              {isDownloading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="size-4 mr-1"
                                >
                                  <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                                  <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                                </svg>
                              )}
                              <p className="block lg:hidden">
                                {cooldownRemaining > 0
                                  ? `Wait (${cooldownRemaining}s)`
                                  : "PDF"}
                              </p>
                              <p className="hidden lg:block">
                                {isDownloading
                                  ? "Generating..."
                                  : cooldownRemaining > 0
                                  ? `Wait (${cooldownRemaining}s)`
                                  : "Download PDF"}
                              </p>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="hidden lg:block">
                            Or press Ctrl + P
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[100svh] pt-16 border-l">
              <div className="max-w-screen-md w-full mx-auto my-4 px-4 2xl:px-0">
                {/* <div className="flex mb-2 justify-between items-start text-sm text-gray-600">
                  <span>Remaining PDF generations: {remainingGenerations}</span>
                  <span>
                    Resets in: {timeRemaining.hours}h {timeRemaining.minutes}m
                  </span>
                </div> */}
                <div className="border-2 p-4 mb-4 bg-yellow-100 border-yellow-400 text-yellow-900 text-pretty">
                  <p className="text-xs md:text-sm text-pretty">
                    Note: Include only relevant sections for a more concise and
                    effective resume. You can rearrange or remove sections as
                    needed for customization.
                  </p>
                </div>
                <ResumeForm
                  onSubmit={handleFormSubmit}
                  sectionOrder={sectionOrder}
                  setSectionOrder={setSectionOrder}
                />
              </div>
              <div className="max-w-screen-md w-full mx-auto pb-1 px-4 2xl:px-0 md:flex items-center justify-between">
                <p className="text-sm text-mono_primary text-center font-medium">
                  Made with{" "}
                  <span className="bg-clip-text bg-mono_secondary text-transparent animate-pulse select-none">
                    ❤️
                  </span>{" "}
                  by{" "}
                  <span className="text-mono_secondary underline">
                    <Link href="https://pujan.pm" target="_blank">
                      Pujan Modha
                    </Link>
                  </span>
                </p>
                <p className="md:text-sm text-mono_primary text-center font-medium opacity-70 text-xs">
                  Total Resumes Generated:{" "}
                  <span className="text-mono_secondary">
                    {totalPDFsGenerated}
                  </span>
                </p>
              </div>
              <div className="h-16 w-full m-auto bg-white border-t flex">
                <div className="flex flex-col items-center w-full">
                  <div className="max-w-screen-md w-full mx-auto m-auto px-4 2xl:px-0 md:flex items-center justify-between">
                    <p className="text-sm text-mono_primary text-center font-medium">
                      Licensed under{" "}
                      <span className="text-mono_secondary underline">
                        <Link
                          href="https://github.com/pujan-modha/mono-resume/blob/main/LICENSE"
                          target="_blank"
                        >
                          MIT
                        </Link>
                      </span>
                      .
                    </p>
                    <p className="md:text-sm text-mono_primary text-center font-medium text-xs">
                      Source Code available on{" "}
                      <span className="text-mono_secondary underline">
                        <Link
                          href="https://github.com/pujan-modha/mono-resume"
                          target="_blank"
                        >
                          GitHub
                        </Link>
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="absolute xl:hidden bottom-8 right-8">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="iconPreview"
                    disabled={!resumeData}
                    className="rounded-full shadow-md"
                    onClick={() => setIsPreviewOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 m-0">
                  <DialogTitle className="hidden">Preview</DialogTitle>
                  <DialogDescription />
                  <div className="fixed top-0 left-0 w-full h-full">
                    <ScrollArea className="h-[100svh]">
                      {resumeData && (
                        <div
                          ref={previewResumeRef}
                          className="min-w-5xl w-full"
                        >
                          <Resume
                            data={resumeData}
                            sectionOrder={sectionOrder}
                          />
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                  <DialogClose asChild className="absolute bottom-8 right-8">
                    <Button
                      size="iconPreview"
                      disabled={!resumeData}
                      className="rounded-full shadow-md"
                      onClick={() => setIsPreviewOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.04L10 8.94 6.28 5.22Z" />
                      </svg>
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ScrollArea className="h-[100svh] hidden xl:flex">
            {resumeData && (
              <div ref={mainResumeRef} className="min-w-5xl w-full">
                <Resume data={resumeData} sectionOrder={sectionOrder} />
              </div>
            )}
          </ScrollArea>
        </div>
      </main>
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isDownloadComplete
                ? "Download Complete!!"
                : "Generating Your Resume..."}
            </AlertDialogTitle>
            <AlertDialogDescription />
            <div className="flex flex-col space-y-4 text-left">
              {currentFunFact && (
                <div className="text-sm bg-blue-100 p-4 text-blue-900 border border-blue-400 text-pretty">
                  <p className="font-semibold">Did you know?</p>
                  <p className="text-pretty">{currentFunFact.fact}</p>
                </div>
              )}
              <div className="text-sm text-neutral-700">
                {isDownloadComplete ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex md:flex-row flex-col items-center justify-between h-8">
                      <span className="text-sm text-gray-600">
                        Remaining PDF generations: {remainingGenerations}
                      </span>
                      <span className="text-sm text-gray-600">
                        Resets in: {timeRemaining.hours}h{" "}
                        {timeRemaining.minutes}m
                      </span>
                    </div>
                    <div className="w-full grid md:grid-cols-2 gap-4">
                      <Link
                        href="https://www.buymeacoffee.com/pujan_modha"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2 bg-yellow-100 text-yellow-900 border-yellow-400 hover:bg-yellow-200 hover:border-yellow-500 hover:text-yellow-950"
                        >
                          <Image
                            src="/bmac-logo.svg"
                            alt="Buy Me a Coffee"
                            width={16}
                            height={16}
                            className="w-4 h-auto"
                          />
                          <span className="font-bold">Buy Me a Coffee</span>
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-900 border-green-400 hover:bg-green-200 hover:border-green-500 hover:text-green-950"
                        onClick={() => {
                          if (navigator.share) {
                            navigator
                              .share({
                                title: "Mono Resume",
                                text: "Check out this awesome resume builder!!",
                                url: "https://mono-resume.pujan.pm",
                              })
                              .catch(console.error);
                          } else {
                            navigator.clipboard
                              .writeText("https://mono-resume.pujan.pm")
                              .then(() => alert("Link copied to clipboard!!"))
                              .catch(console.error);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
                        </svg>
                        <span className="font-bold">Share</span>
                      </Button>
                    </div>
                    <Button onClick={closeAlertDialog}>Close</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-6 w-4 animate-spin text-primary" />
                    <p className="text-center">
                      Crafting your perfect resume...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>PDF Generation Limit Reached</AlertDialogTitle>
            <AlertDialogDescription />
            <div className="flex flex-col space-y-4 text-left">
              <div className="text-sm text-neutral-700">
                <p>
                  You have reached the PDF generation limit. Please try again in{" "}
                  {timeRemaining.hours} hours and {timeRemaining.minutes}{" "}
                  minutes.
                </p>
              </div>
              <Button onClick={closeLimitDialog}>Close</Button>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
