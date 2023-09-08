module.exports = {
  // The custom helper 'format_date' takes in a timestamp
  format_date: (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();

    return `${month}/${day}/${year}`;
  },
};

// const format_date = (date) => {
//   const formattedDate = new Date(date);
//   const year = formattedDate.getFullYear();
//   const month = formattedDate.getMonth() + 1;
//   const day = formattedDate.getDate();

//   console.log(`${month}/${day}/${year}`);
//   return `${month}/${day}/${year}`;
// }

// const format_time = (date) => {
//   let idk = date.toLocaleTimeString();
//   console.log(idk);
//     return date.toLocaleTimeString();
//   }

// format_date('Sun Sep 03 2023 22:53:05 GMT-0500 (Central Daylight Time)')
// format_time('Sun Sep 03 2023 22:53:05 GMT-0500 (Central Daylight Time)')
