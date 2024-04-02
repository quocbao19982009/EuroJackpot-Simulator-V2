using FastEndpoints;
using FluentValidation;

namespace API.Endpoints.Balance.Post
{
    public class Validator : Validator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.Amount).GreaterThanOrEqualTo(0).WithMessage("Invalid amount, must be more than 0");
        }
    }
}