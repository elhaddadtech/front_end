"use client"
import useStore from "../store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
// import { Badge } from "../components/ui/badge"
import Link from "next/link"
// import dynamic from "next/dynamic";
const languages = [
  { code: "french", name: "French", coursesCount: 2, level: "B1", score_test_1: "205/400",total_time:"15:25:31" },
  { code: "english", name: "English", coursesCount: 1, level: "B1", score_test_1: "240/400" ,total_time:"14:30:45"},
  { code: "arabic", name: "Arabic", coursesCount: 1, level: "B1", score_test_1: "280/400" ,total_time:"20:40:05"},
  // { code: "spanish", name: "Spanish", coursesCount: 1, level: "B1", score_test_1: "80/100" },
]

export default function LanguageCards() {
  const { counter, increment, decrement } = useStore();
  return (
    <div className="grid grid-cols-1  gap-3">
      {languages.map((lang) => (
        <Link href={`/language/${lang.code}`} key={lang.code} className="">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">{lang.name}</CardTitle>
              <button onClick={increment}>Increment</button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div   className="badge bg-red-300 text-red-600 font-medium ">
                  Level {lang.level} {counter} 
                </div>
                <div className="text-sm font-semibold text-muted-foreground space-y-4 ">
                  <h2>Test 1: {lang.score_test_1} </h2> 
                  <h2  className="badge badge-error badge-outline">Total Time: {lang.total_time}</h2>
                </div>
               
              </div>
              <p className="text-sm text-muted-foreground">{lang.coursesCount} course(s)</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

