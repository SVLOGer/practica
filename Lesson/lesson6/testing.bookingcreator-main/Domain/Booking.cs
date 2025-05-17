public class Booking
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public decimal PricePerNight { get; set; }
    public decimal TotalPrice { get; private set; }

    public void ApplyDiscount( decimal discountPercentage )
    {
        TotalPrice *= ( 1 - discountPercentage );
    }

    public void CalculateTotalPrice()
    {
        int numberOfNights = ( CheckOutDate - CheckInDate ).Days;
        TotalPrice = numberOfNights * PricePerNight;
    }
}