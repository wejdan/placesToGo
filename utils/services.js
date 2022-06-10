export function searchForRestaurants(dest) {
  const data = [
    {
      id: 0,
      name: 'Hotel Pilar',
      img: 'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg"',
      location: dest,
    },
    {
      id: 1,
      name: 'Kudo',
      img: 'https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-600x750.jpg',
      location: dest,
    },
  ];
  let promise = new Promise(function (resolve, reject) {
    // the function is executed automatically when the promise is constructed

    // after 1 second signal that the job is done with the result "done"
    setTimeout(() => resolve(data), 1000);
  });

  return promise;
}
