// A Room value is exactly one of these four strings.
// It is impossible for a Room variable to contain any other string.
type Room = "A" | "B" | "C" | "Exit";

export function play(): void {
  console.info("Welcome to the text adventure! Open your browser's developer console to play.");
  const playerName = getInput("Please enter your name.");
  console.log(playerName);

  console.info("Hello, " + playerName + ".");

  console.info("You are in a building. Your goal is to exit this building.");
  start_room();
  let currentRoom: Room = "A";
  let hasKey: boolean = false;
  let windowOpen: boolean = false;

  while (currentRoom != "Exit") {
    const command = getInput("Please enter a command.");
    console.log(command);

    switch (currentRoom) {
      case "A":
        switch (command) {
          case "west":
            currentRoom = "B";
            console.info("You go through the west door. You are in a room with a table.");
            if (!hasKey) {
              console.info("On the table there is a key.");
            }
            console.info("There is a door on the east wall of this room.");
            break;
          case "north":
            if (hasKey) {
              currentRoom = "C";
              console.info("You unlock the north door with the key and go through the door.");
              console.info("You are in a bright room. There is a door on the south wall of this room and a window on the east wall.");
            } else {
              console.error("You try to open the north door, but it is locked.");
            }
            break;
          default:
            invalid_choice();
            break;
        }
        break;

      case "B":
        switch (command) {
          case "east":
            currentRoom = "A";
            start_room();
            break;
          case "take key":
            if (hasKey) {
              console.error("You already have the key.");
            } else {
              console.info("You take the key from the table.");
              hasKey = true;
            }
            break;
          default:
            invalid_choice();
            break;
        }
        break;

      case "C":
        switch (command) {
          case "south":
            currentRoom = "A";
            start_room();
            break;
          case "east":
            if (windowOpen) {
              currentRoom = "Exit";
              console.info("You step out from the open window.");
            } else {
              console.error("The window is closed.");
            }
            break;
          case "open window":
            if (windowOpen) {
              console.error("The window is already open.");
            } else {
              console.info("You open the window.");
              windowOpen = true;
            }
            break;
          default:
            invalid_choice();
            break;
        }
        break;
    }
  }
  console.info("You have exited the building. You win! \n Congratulations, " + playerName + "!");
}
export function invalid_choice(): void {
  console.error("Unrecognized command.");}
export function start_room(): void {
  console.info("You are in an empty room. There are doors on the north and west walls of this room.");}

  function getInput(promptMessage: string): string {
  let input: string | null;
  do { 
    input = prompt(promptMessage);
    if (input == null || input.trim() === "") console.error("Invalid input.");
  } while (input == null || input.trim() === "");
  return input.trim();
}