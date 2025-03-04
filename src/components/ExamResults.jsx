import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import useStore from "../store/useStore";
import "../app/globals.css";

export default function ExamResults() {
  // Call useStore inside the functional component
  const { students, languages } = useStore();

  // Transform the data dynamically
  const transformData = () => {
    return Object.entries(students?.languages || {}).reduce(
      (result, [language, tests]) => {
        result[language] = tests.flatMap((test) =>
          Object.entries(test)
            .filter(([key]) => key.startsWith("type_test"))
            .map(([key, name], index) => {
              const id = index + 1;
              const dateKey = `date_test_${id}`;
              const scoreKey = `score_test_${id}`;
              const levelKey = `level_test_${id}`;
              return {
                id,
                name,
                date: test[dateKey],
                score: parseInt(test[scoreKey]?.split("/")[0]) || 0,
                totalScore: parseInt(test[scoreKey]?.split("/")[1]) || 0,
                grade: test[levelKey] || "N/A",
              };
            })
        );
        return result;
      },
      {}
    );
  };

  // Now call transformData inside the component
  const transformedData = transformData();

  return (
    <Tabs defaultValue="french">
      <TabsList>
        {languages?.map((language) => (
          <TabsTrigger key={language.code} value={language.name.toLowerCase()}>
            {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(transformedData).map(([language, results]) => (
        <TabsContent key={language} value={language}>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language.charAt(0).toUpperCase() + language.slice(1)} Exam
                  Results.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Date
                        </TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Level</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">
                            {exam.name}
                          </TableCell>

                          {/* Check if exam.date is not empty */}
                          {exam.date && (
                            <>
                              <TableCell className="hidden sm:table-cell">
                                {exam.date}
                              </TableCell>
                              <TableCell>
                                {exam.score}/{exam.totalScore}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className="font-semibold"
                                >
                                  {exam.grade}
                                </Badge>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>
                      <section className="flex justify-evenly font-bold text-md">
                        {console.log(students)}
                        <span>
                          Note activité :
                          {
                            students?.languages?.[language][0].courses[0]
                              ?.noteCC1
                          }
                        </span>
                        <span>
                          {" "}
                          Note temps :{" "}
                          {
                            students?.languages?.[language][0].courses[0]
                              ?.noteCC2
                          }
                        </span>
                        <span>
                          noteCC:{" "}
                          {
                            students?.languages?.[language][0].courses[0]
                              ?.noteCC
                          }
                        </span>

                        <span>
                          noteExam:{" "}
                          {students?.languages?.[language][0].courses[0]
                            ?.noteExam !== null
                            ? students?.languages?.[language][0].courses[0]
                                ?.noteExam
                            : "N/A"}
                        </span>
                      </section>
                    </TableCaption>
                  </Table>
                </div>
              </CardContent>
            </Card>
            {/* <LanguageProgressCharts language={language} /> */}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
