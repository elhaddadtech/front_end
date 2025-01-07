
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Link from "next/link"
import dynamic from "next/dynamic";
const languages = [
  { code: "french", name: "French", coursesCount: 2, level: "B1", score_test_1: "85/100" },
  { code: "english", name: "English", coursesCount: 1, level: "B1", score_test_1: "78/100" },
  { code: "arabic", name: "Arabic", coursesCount: 1, level: "B1", score_test_1: "72/100" },
  // { code: "spanish", name: "Spanish", coursesCount: 1, level: "B1", score_test_1: "80/100" },
]

export default function LanguageCards() {
  return (
    <div className="grid grid-cols-1  gap-3">
      {languages.map((lang) => (
        <Link href={`/language/${lang.code}`} key={lang.code} className="">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">{lang.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div   className="badge bg-red-300 text-red-600 font-medium ">
                  Level {lang.level}
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  Test 1: {lang.score_test_1}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{lang.coursesCount} course(s)</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

