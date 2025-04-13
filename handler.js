exports.hello = async (event) => {
  let count=0;
  for (let index = 0; index < 5000000; index++) {
    count++;
    console.log(count);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
      count:count
    }),
  };
};
