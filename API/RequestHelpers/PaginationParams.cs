namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int maxPageSize = 50;
        private int _pageSie = 10;
        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => _pageSie;
            set => _pageSie = value > maxPageSize ? maxPageSize : value;
        }
    }
}