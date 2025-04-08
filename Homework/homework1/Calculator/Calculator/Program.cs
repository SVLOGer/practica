using System;

int firstOperand = ReadOperand();
char operation = ReadCh();
int secondOperand = ReadOperand();

int result = CalculateExample();

char ReadCh()
{
    char Ch = (char)Console.Read();

    return Ch;
}

int ReadOperand()
{

}

int CalculateExample()
{
    switch (operation)
    {
        case '+': return firstOperand + secondOperand; break;
        case '-': return firstOperand - secondOperand; break;
        case '*': return firstOperand * secondOperand; break;
        case '/': return firstOperand / secondOperand; break;
        default: Console.WriteLine("Second character should be operation symbol, like + or - or * or /"); break;
    }
}

PrintMenuCommand("Enter name: ");
string name = ReadLine();

PrintMenuCommand("Enter age: ");
string ageString = ReadLine();
bool ageParseResult = int.TryParse(ageString, out int age);
if (!ageParseResult)
{
    Console.WriteLine("Incorrect age (Use numbers)");
    return;
}
else
{
    PrintUserData(name, age);
}

void PrintMenuCommand(string command)
{
    Console.Write(command);
}

string ReadLine()
{
    return Console.ReadLine();
}

void PrintUserData(string name, int age)
{
    Console.WriteLine($"Your name: {name}");
    Console.WriteLine($"Your age: {age}");
}