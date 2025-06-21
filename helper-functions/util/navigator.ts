export default function pageResponse(page, component) {
  return page.waitForResponse(
    (response) =>
      response.url().includes(`views/${component}.html`) &&
      response.status() === 200
  );
}
