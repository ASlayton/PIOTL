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
    public class UserController : ControllerBase
    {
        DatabaseInterface _db;
        UserAccess _User;

        public UserController(DatabaseInterface db)
        {
            _db = db;
            _User = new UserAccess(db);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var allUsers = _User.GetUser();
            return Ok(allUsers);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var singleUser = _User.GetUserById(id);
            return Ok(singleUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            var User = _User.GetUserById(id);

            if (User == null)
            {
                return NotFound();
            }

            var success = _User.DeleteById(id);

            if (success)
            {
                return Ok();
            }
            return BadRequest(new { Message = "Delete was unsuccessful" });
        }

        [HttpPut("User")]
        public IActionResult UpdateUser(User User)
        {
            var Users = _User.UpdateUser(User);
            return Ok();
        }

        [HttpPost("User")]
        public async Task<ActionResult<User>> PostUser(User User)
        {
            return Ok(await _User.PostUser(User));
        }
    }
}