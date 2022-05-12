namespace TodoApi.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public int Index { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Deadline { get; set; }
        public string Description { get; set; }
    }
}
