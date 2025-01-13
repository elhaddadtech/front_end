"use client";
import useStore from "../store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function LanguageCards() {
  const { languages, status } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("status", languages);

  // useEffect(() => {

  //   setIsLoaded(true)
  // }, []);
  // // Loading state while data is being fetched
  // if (!isLoaded ) {
  //   return <div className="">Loading languages...</div>;
  // }

  // Fallback for empty or undefined `languages`
  if (!languages || languages.length === 0) {
    return <div>No languages available.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {languages.map((lang) => (
        <Link href={`/language/${lang.code}`} key={lang.code} className="">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">
                {lang.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className="rounded-[.3rem] bottom-5">
                  Level {lang.level}
                </Badge>
                <div className="text-sm font-semibold text-muted-foreground space-y-4">
                  <h2>Test 1: {lang.score_test_1}</h2>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {lang.coursesCount} course(s)
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Time: {lang.total_time}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
