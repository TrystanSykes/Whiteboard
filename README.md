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
