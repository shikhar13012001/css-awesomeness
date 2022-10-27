# Ceyshell
_____
ceyshell is a simple implementation of a shell in C++
It demonstrates the basics of how a shell works.
That is: read, parse, fork, exec, and wait.  Since its purpose is demonstration
(not feature completeness or even fitness for casual use), it has many
limitations, which we will be seeing soon:

___
### Execution
- Compile ceyshell5.cpp & run
```
g++ ceyshell5.cpp -o ceyshell && ./ceyshell
```

---

### Functionality
* Facilitates execution of all external commands and **all the internal commands mentioned in the assignment**
* Supports following built-in commands
    * cd \<dir>  : to change the present working directory
    * history [n] : returns previous [n] commands executed
    * help
    * exit
* Supports foreground and background processes. To execute a process in the background, `&` must be suffixed in the end. 
* **It also supports command concatenation using `&&`**
* Supports both batch and interactive mode.

### Limitations
* executing `cd` without the following argument does not change the PWD to /home
* can only concatenate/pipe two commands at max
* does not support auto-complete
* supports history but does not support selection of previously run commands

### Salient Features
* csh_loop while allocating memory for the inputs takes excellent care that buffer overflow does not happen and reallocates more memory to it, as and when needed. 
(However this functionality for `|` and `&&` commands in not yet available)
* 

### Member methods
1. get_working_path: gets the current working directory 
2. csh_cd : for directory navigation; implemented using chdir
3. csh_help
5. csh_num_builtins: returns number of builtin commands we have defined
6. csh_history
    * return history of previously run commands
    * if no argument is passed, it returns previous 100 commands.
    1. appendLineToFile: this is implemented using appendLineToFile fucntion
        * is creates `history.txt` file in the directory our shell is present, if it does not exist, and appends the command we run in `ceyshell` at the end of it.
        * last N lines of the file are extracted using an implementation of circular queue. 
7. csh_read_line: to read the input from the user; takes special care in error handling and avoiding buffer overflow
8. csh_split_line : tokenizes our input as per `\t`, `\n`, `\r`, `\a`
9. csh_loop
    1. csh_loop
        * Runs the shell continously, displaying the current `PWD` followed by a `$` while waiting for the user input. 
        * it recieves the input from user using `csh_read_line`, tokenizes it using `csh_split_line`, appends the command in history 
        * it also checks if the entered command has `&&` or `|` in it and bifurcates the command into two.
        * having tokenized the commands properly, it then calls `csh_execute` on it.
    2. csh_execute
        * it initially checks the validity of our entered commands, compares them with the builtin commands, executes them on a match
        * Else it calls csh_launch
    3. csh_launch
        * it forks and creates a child process. Depending upon the return value of fork, it takes logical decisions. A return value greater than 0 is indicative of parent process and therefore, it waits for the child_process to complete. 
        * however, if our command ends in `&`, the control does not wait and our process continues to run in the background as our shell become ready to accept new input from the user.
10. main 
    * entry point of our program
    * calls csh_loop

11. pipeCommand
    * implemented pipe 
