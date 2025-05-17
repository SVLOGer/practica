namespace lesson7.Contracts
{
    public class Property
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Property( Guid id, string name )
        {
            Id = id;
            Name = name;
        }
    }
}
