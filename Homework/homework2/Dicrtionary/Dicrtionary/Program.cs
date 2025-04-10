using System;
using System.Collections.Generic;
using System.IO;

class Program
{
    private static Dictionary<string, string> _enRu = new();
    private static Dictionary<string, string> _ruEn = new();
    private static readonly HashSet<(string, string)> _pairs = new();
    private const string FilePath = "dictionary.txt";

    static void Main()
    {
        LoadDictionary();

        while (true)
        {
            Console.WriteLine("\nВыберите действие:\n1. Перевести слово\n2. Добавить слово\n3. Выйти");
            switch (Console.ReadLine())
            {
                case "1":
                    Translate();
                    break;
                case "2":
                    AddWord();
                    break;
                case "3":
                    SaveDictionary();
                    return;
                default:
                    Console.WriteLine("Неверный ввод!");
                    break;
            }
        }
    }

    private static void LoadDictionary()
    {
        if (!File.Exists(FilePath)) return;

        foreach (var line in File.ReadAllLines(FilePath))
        {
            var parts = line.Split(':', 2);
            if (parts.Length != 2) continue;

            var (word, translation) = (parts[0].Trim(), parts[1].Trim());
            AddToDictionaries(word, translation);
        }
    }

    private static void SaveDictionary()
    {
        using var writer = new StreamWriter(FilePath);
        foreach (var (word, translation) in _pairs)
        {
            writer.WriteLine($"{word}:{translation}");
        }
    }

    private static void Translate()
    {
        Console.Write("Введите слово: ");
        var input = Console.ReadLine()?.Trim();

        if (_enRu.TryGetValue(input, out var translation) ||
            _ruEn.TryGetValue(input, out translation))
        {
            Console.WriteLine($"Перевод: {translation}");
            return;
        }

        Console.WriteLine("Слово не найдено. Добавить? (да/нет)");
        if (Console.ReadLine()?.ToLower() == "да") AddWord();
    }

    private static void AddWord()
    {
        Console.Write("Введите слово: ");
        var word = Console.ReadLine()?.Trim();
        Console.Write("Введите перевод: ");
        var translation = Console.ReadLine()?.Trim();

        if (string.IsNullOrEmpty(word) || string.IsNullOrEmpty(translation))
        {
            Console.WriteLine("Ошибка ввода!");
            return;
        }

        if (!AddToDictionaries(word, translation))
        {
            Console.WriteLine("Пара уже существует!");
            return;
        }

        Console.WriteLine("Слово добавлено!");
    }

    private static bool AddToDictionaries(string word, string translation)
    {
        var pair = (word, translation);
        var reversePair = (translation, word);

        if (_pairs.Contains(pair) || _pairs.Contains(reversePair))
            return false;

        _pairs.Add(pair);
        _enRu[word] = translation;
        _ruEn[translation] = word;
        return true;
    }
}
