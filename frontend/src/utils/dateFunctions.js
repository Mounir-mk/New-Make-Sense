// eslint-disable-next-line camelcase
const getDate = (publish_date, deadline) => {
  let statusStep = 1;
  // Reformatting dates received from DB and also putting the current date
  const publishDate = new Date(publish_date);
  const deadlineDate = new Date(deadline);

  const currentDate = new Date();

  // calculating to have the durationPercentage of time from publishDate to deadlineDate
  const totalDuration = deadlineDate.getTime() - publishDate.getTime();
  const elapsedDuration = currentDate.getTime() - publishDate.getTime();

  // calculating to get a durationPercentage of this
  const durationPercentage = (elapsedDuration / totalDuration) * 100;
  // this condition defines which step of the status are we in. if above 20%, step 2, if above 40%, step 3 etc etc
  if (durationPercentage >= 80) {
    statusStep = 5;
  } else if (durationPercentage >= 60) {
    statusStep = 4;
  } else if (durationPercentage >= 40) {
    statusStep = 3;
  } else if (durationPercentage >= 20) {
    statusStep = 2;
  }

  // i divide the totalDuration by 4 to get the duration of each status
  const statusDuration = totalDuration / 4;
  return {
    statusStep,
    statusDuration,
    durationPercentage,
    publishDate,
    currentDate,
  };
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const minDate = `${year}-${`0${month}`.slice(-2)}-${`0${day}`.slice(-2)}`;

function convertToFr(dateToConvert) {
  const [y, m, d] = dateToConvert.slice(0, 10).split("-");
  return `${d}-${m}-${y}`;
}
export { getDate, convertToFr, minDate };
