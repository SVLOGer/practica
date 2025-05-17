public interface IBookingRepository
{
    void AddBooking( Booking booking );
    void RemoveBooking( Booking booking );
    IEnumerable<Booking> GetBookings();
    bool IsRoomAvailable( int roomId, DateTime checkInDate, DateTime checkOutDate );
}
