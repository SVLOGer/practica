using System;
using System.Collections.Generic;

Random rand = new Random();
double multiplicator = 2d;

List<string> casinoName = [
" ####  ###   #### ##### #   #  ### ",
"#     #   # #       #   ##  # #   #",
"#     #####  ###    #   # # # #   #",
"#     #   #     #   #   #  ## #   #",
" #### #   # ####  ##### #   #  ### "
];

EnterCasinoName();

Console.Write("Enter deposit: ");
double balance = Convert.ToDouble(Console.ReadLine());

while (balance > 0)
{
    WriteMenu();
    double bet = Convert.ToDouble(Console.ReadLine());
    balance -= bet;

    int randNumber = rand.Next(1, 21);
    Console.WriteLine($"The number came up {randNumber}");

    CheckWinCombination(randNumber, bet );

    Console.WriteLine("You want to continue? Enter Y/N");
    string isContinue = Console.ReadLine();

    if (isContinue == "N")
    {
        break;
    }
}

void EnterCasinoName()
{
    foreach (string line in casinoName)
    {
        Console.WriteLine(line);
    }
}

void WriteMenu()
{
    Console.WriteLine($"Your balance {balance}");
    Console.WriteLine("Enter your bet");
}

void CheckWinCombination(int randNumber, double bet)
{
    if (randNumber >= 18)
    {
        double win = bet * (1 + multiplicator * randNumber % 17);
        balance += win;
    }
}