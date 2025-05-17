public class BookingService
{
    private readonly IBookingRepository _repository;

    public BookingService( IBookingRepository repository )
    {
        _repository = repository;
    }

    public void CreateBooking( Booking booking )
    {
        // Проверка на корректность дат
        if ( booking.CheckInDate >= booking.CheckOutDate )
        {
            throw new ArgumentException( "Дата выезда должна быть позже даты заезда." );
        }

        // Проверка доступности комнаты
        if ( !_repository.IsRoomAvailable( booking.RoomId, booking.CheckInDate, booking.CheckOutDate ) )
        {
            throw new InvalidOperationException( "Комната недоступна на выбранные даты." );
        }

        // Применение скидки для длительных бронирований
        int numberOfNights = ( booking.CheckOutDate - booking.CheckInDate ).Days;
        if ( numberOfNights > 7 )
        {
            booking.ApplyDiscount( 0.15m ); // 15% скидка
        }

        // Проверка на минимальную длительность проживания
        if ( numberOfNights < 1 )
        {
            throw new ArgumentException( "Бронирование должно быть не менее одной ночи." );
        }

        // Добавление бронирования
        _repository.AddBooking( booking );
    }

    public void CancelBooking( Booking booking )
    {
        // Проверка, что бронирование существует
        var existingBooking = _repository.GetBookings().FirstOrDefault( b => b.Id == booking.Id );
        if ( existingBooking == null )
        {
            throw new InvalidOperationException( "Бронирование не найдено." );
        }

        // Логика отмены бронирования
        _repository.RemoveBooking( booking );
    }
}
