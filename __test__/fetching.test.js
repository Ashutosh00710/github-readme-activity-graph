const { fetchContributions } = require('../src/fetching');

//Testing fetch function (fetching.ts)
it('Fetching Data with correct username', async () => {
  const fetchedData = await fetchContributions('ashutosh00710');
  expect.assertions(2);
  expect(fetchedData).toEqual(expect.any(Array));
  expect(fetchedData.length).toEqual(31);
});

it('Fetching Data with incorrect username', async () => {
  const fetchedData = await fetchContributions('');
  expect.assertions(1);
  expect(fetchedData).toEqual(
    `Can't fetch any contribution. Please check your username 😬`
  );
});
