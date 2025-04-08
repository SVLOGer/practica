
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