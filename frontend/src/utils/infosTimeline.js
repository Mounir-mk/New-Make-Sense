import { convertToFr } from "./dateFunctions";

const timelineTitles = [
  "Décision débutée",
  "Deadline pour donner son avis",
  "Première décision prise",
  "Deadline pour rentrer en conflit",
  "Décision définitive",
];

function timelineDates(startDate, endDate, publishDate, statusDuration) {
  const dates = [
    convertToFr(startDate),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration).toISOString()
      ),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration * 2).toISOString()
      ),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration * 3).toISOString()
      ),
    convertToFr(endDate),
  ];

  return dates;
}
export { timelineTitles, timelineDates };
