import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import * as elements from "typed-html";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <body class="flex w-full h-screen justify-center items-center">
          <button hx-post="/clicked" hx-swap="outerHTML">
            Click Me!
          </button>
        </body>
      </BaseHtml>
    )
  )
  .post("/clicked", () => (
    <div class="text-blue-600">I'm from the server biatch!</div>
  ))
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML 5</title>
    <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

${children}

</html>
`;

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

const db: Todo[] = [
  { id: 1, content: "Learn HTML", completed: false },
  { id: 2, content: "Learn CSS", completed: true },
  { id: 3, content: "Learn JS", completed: false },
];

function TodoItem({ id, content, completed }: Todo) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input type="checkbox" checked={completed} />
      <button class="text-red-500">X</button>
    </div>
  );
}
