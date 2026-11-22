# AI Usage

## Tools used

- Claude (Anthropic)
- ChatGPT (OpenAI)

## Representative prompts

1. "I need your help to build this assessment." (I shared the task brief and the Figma screenshots.)
2. "Help me implement task creation, editing, deletion, status updates, search and filters."
3. "Help me implement localStorage and responsive layouts."

## AI-assisted areas

- Initial project structure and component breakdown
- React state management (Context + `useReducer`) and task functionality
- CSS styling and responsive design suggestions
- Git, GitHub and Vercel deployment steps
- Debugging and documentation

## One suggestion I checked and corrected

The first version of the CSS made the "Focus Notes 01 / 03" label wrap onto
two lines on a 375px phone screen. I tested the layout in Chrome DevTools and
found that a `max-width` rule in the mobile section was squeezing the label.
I fixed it by adding `white-space: nowrap` and widening the `max-width`, then
checked again at 375px, 768px and 1440px.
