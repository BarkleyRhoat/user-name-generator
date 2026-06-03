# Stories

## Feature 1 - Generate Random Names Buttons

User story: As a user, I want to click two buttons that each get a random word from the random-word-slugs package so that the two words are concatenated into a single username string.

### Feature 1 Acceptance Criteria

- Two buttons are displayed on the page for name generation
- Each button gets a random word from the npm package random-word-slugs
- The two words are concatenated into a single string to form a username

## Feature 2 - Generate Random Avatar

User story: As a user, I want to click a third button that generates a random SVG avatar from the DiceBear API so that the avatar appears next to my generated username.

### Feature 2 Acceptance Criteria

- A third button is displayed on the page for the svg generation
- When each button is clicked it is disabled and enabled when all three buttons generate are clicked it resets
- Clicking the button fetches a created SVG avatar from the DiceBear API
- The generated avatar is paired with the current generated username

## Feature 3 - Display Username and Avatar

User story: As a user, I want to see my generated username and avatar displayed in a card on the page so that I can view the names created.

### Feature 3 Acceptance Criteria

- A generated names card is visible on the page
- Each generated name and its avatar are rendered inside the card
- New entries are added to the card each time a name/avatar is generated

## Feature 4 - Save Username and Avatar

User story: As a user, I want to click on a username in the generated names card so that it is saved to a JSON server and displayed in a separate saved names card.

### Feature 4 Acceptance Criteria

- A local JSON server is set up to store saved names and avatars
- Each name in the generated names card is clickable
- Clicking a name sends the username and avatar data to the JSON server
- Saved names are saved in the server and shown on page load
- The save names card is displayed seperately fromt he generated names card

## Feature 5 - Hovering and Dragging on the saved usernames

User story: As a user, I want to hover over a name to see an enlarged version of its avatar and be able to drag around saved username cards

### Feature 5 Acceptance Criteria

- Hovering over a saved name enlarges its avatar
- When you drag a username card it stays in place where you leave it
