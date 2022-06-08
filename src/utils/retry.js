
export default (model, number) => {
  for (let i = 0; i <= number; i++) {
    setTimeout(() => {
      model.save();
      console.log(`Retry number: ${i++}`)
    }, 5000);
  }
};
