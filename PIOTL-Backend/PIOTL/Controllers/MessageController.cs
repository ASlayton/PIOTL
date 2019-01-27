using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIOTL.DataAccess;
using PIOTL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PIOTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        DatabaseInterface _db;
        MessageStorage _Message;

        public MessageController(DatabaseInterface db)
        {
            _db = db;
            _Message = new MessageStorage(db);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var allMessages = _Message.GetMessage();
            return Ok(allMessages);
        }

        [HttpGet("{id}")]
        public IActionResult GetMessageById(int id)
        {
            var singleMessage = _Message.GetMessageById(id);
            return Ok(singleMessage);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var Message = _Message.GetMessageById(id);

            if (Message == null)
            {
                return NotFound();
            }

            var success = _Message.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("Message")]
        public IActionResult UpdateMessage(Message Message)
        {
            var Messages = _Message.UpdateMessage(Message);
            return Ok();
        }

        [HttpPost("Message")]
        public async Task<ActionResult<Message>> PostMessage(MessageWithEmployeeId Message)
        {
            return Message.EmployeeId is null
                ? Ok(await _Message.PostMessage(Message))
                : Ok(await _Message.PostMessageAndAssignToEmployee(Message));
        }
    }
}