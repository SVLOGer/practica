using System;

class Program
{
    static void Main(string[] args)
    {
        var orderData = RequestOrderData();

        if (ConfirmOrder(orderData))
        {
            DisplaySuccessMessage(orderData);
        }
        else
        {
            Console.WriteLine("Заказ отменен. Попробуйте снова.");
        }
    }

    static OrderData RequestOrderData()
    {
        Console.Write("Введите название товара: ");
        string product = Console.ReadLine();

        Console.Write("Введите количество товара: ");
        int count = int.Parse(Console.ReadLine());

        Console.Write("Введите ваше имя: ");
        string name = Console.ReadLine();

        Console.Write("Введите адрес доставки: ");
        string address = Console.ReadLine();

        return new OrderData
        {
            Product = product,
            Count = count,
            Name = name,
            Address = address
        };
    }

    static bool ConfirmOrder(OrderData order)
    {
        Console.WriteLine($"Здравствуйте, {order.Name}, вы заказали {order.Count} {order.Product} на адрес {order.Address}, все верно? (да/нет): ");
        string confirmation = Console.ReadLine().Trim().ToLower();
        return confirmation == "да";
    }

    static void DisplaySuccessMessage(OrderData order)
    {
        DateTime deliveryDate = DateTime.Now.AddDays(3);
        string formattedDate = deliveryDate.ToString("dd.MM.yyyy");

        Console.WriteLine($"{order.Name}! Ваш заказ {order.Product} в количестве {order.Count} оформлен! Ожидайте доставку по адресу {order.Address} к {formattedDate}.");
    }
}
class OrderData
{
    public string Product { get; set; }
    public int Count { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
}
