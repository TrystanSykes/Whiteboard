https://trystansykes.github.io/Whiteboard/

A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

technologies used:
html was basic
1st time using css animation
javascript was the most complex ive had so far

approach taken:
wrote basic outline then began construction of js framework.
i initally intended to create a fully working game in js before tying anything to the dom but part way through i realised i was creating more work for myself trying to emulate user imput instead of just getting the data from event listeners.
as i went through i came up against issues i had not expected. dealt with them as they appeared.
after i got the basic game working i added extra functionality. Added colors for each team and a cumlative win counter.
through the process i found many ways to break the game and fixed them as i found them.
after i was happy with the functionality and performance of tictactoe i added the cakepudding game and worked on a css transition to flip the whiteboard and switch between games. it took a few interations and trying different techniques but i am happy with the end result.

installation instructions: na

unsolved problems: i had planned to add a points system for hangman but elected to just rest. 
i had people test it and its pretty solid but it would be beneficial to add more media queries to make it look better on mobile. 

logic exp

create 2 teams as objects
3 values, name, piece and turn(true/false)
create array of 3 arrays of 3
initial values spaces
on team ones turn the position they select is changed to x
for team 2 it is changed to o
if a value is x or o it cannot be changed
if pos[0] of all 3 arrays = all o or all x, that team wins
same for pos[0][0], pos[1][1], pos[2][2] and the reverse or all pos in one array
if all arrays full and noone won reset
