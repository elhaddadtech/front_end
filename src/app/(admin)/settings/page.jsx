"use client";

import { useState, useEffect } from "react";

import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { CefrMappingsSettings } from "../../../components/settings/cefr-mappings-settings";
import { RangeCefrSettings } from "../../../components/settings/range-cefr-settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            View and update system configuration parameters
          </p>
        </div>
      </header>
      <div className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  View and update CEFR mappings and range settings for the
                  application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cefr-mappings" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="cefr-mappings">
                      CEFR Mappings
                    </TabsTrigger>
                    <TabsTrigger value="range-cefr">Range CEFR</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cefr-mappings">
                    <CefrMappingsSettings />
                  </TabsContent>
                  <TabsContent value="range-cefr">
                    <RangeCefrSettings />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SidebarInset>
  );
}
