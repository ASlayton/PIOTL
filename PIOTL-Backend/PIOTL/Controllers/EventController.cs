﻿using System;
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
    public class EventController : ControllerBase
    {
        DatabaseInterface _db;
        EventAccess _Event;

        public EventController(DatabaseInterface db)
        {
            _db = db;
            _Event = new EventAccess(db);
        }

        [HttpGet]
        public IActionResult GetAllEvents()
        {
            var allEvents = _Event.GetAllEvents();
            return Ok(allEvents);
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var singleEvent = _Event.GetEventById(id);
            return Ok(singleEvent);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var Event = _Event.GetEventById(id);

            if (Event == null)
            {
                return NotFound();
            }

            var success = _Event.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("Event")]
        public IActionResult UpdateEvent(Event Event)
        {
            var Events = _Event.UpdateEvent(Event);
            return Ok();
        }

        [HttpPost("Event")]
        public async Task<ActionResult<Event>> PostEvent(Event Event)
        {
            return Ok(await _Event.PostEvent(Event));
        }
    }
}