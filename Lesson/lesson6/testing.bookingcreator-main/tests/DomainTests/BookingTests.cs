using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainTests
{
    public class BookingTests
    {
        [Fact]
        public void Correct_discount_percentage_applied_correctly()
        {
            Booking booking = new()
            {
                PricePerNight = 100,
                CheckInDate = DateTime.UtcNow.AddDays(1),
                CheckOutDate = DateTime.UtcNow.AddDays(2),
            };

            booking.CalculateTotalPrice();

            const decimal discountPercentage = 0.12m;

            booking.ApplyDiscount(discountPercentage);

            Assert.Equal(88, booking.TotalPrice);
        }
    }
}
