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
    public class ChoresListController : ControllerBase
    {
        DatabaseInterface _db;
        ChoresListAccess _ChoresList;

        public ChoresListController(DatabaseInterface db)
        {
            _db = db;
            _ChoresList = new ChoresListAccess(db);
        }

        [HttpGet]
        public IActionResult GetAllChoresLists()
        {
            var allChoresLists = _ChoresList.GetAllChoresLists();
            return Ok(allChoresLists);
        }

        [HttpGet("{id}")]
        public IActionResult GetChoresListById(int id)
        {
            var singleChoresList = _ChoresList.GetChoresListById(id);
            return Ok(singleChoresList);
        }

        [HttpGet("ChoresListByUser/{id}")]
        public IActionResult GetAllChoresListsByUser(int id)
        {
            var choresListByUser = _ChoresList.GetAllChoresListsbyUser(id);
            return Ok(choresListByUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var ChoresList = _ChoresList.GetChoresListById(id);

            if (ChoresList == null)
            {
                return NotFound();
            }

            var success = _ChoresList.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut]
        public IActionResult UpdateChoresList(BaseChoresList ChoresList)
        {
            var ChoresLists = _ChoresList.UpdateChoresList(ChoresList);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<ChoresList>> PostChoresList(BaseChoresList BaseChoresList)
        {
            return Ok(await _ChoresList.PostChoresList(BaseChoresList));
        }
    }
}