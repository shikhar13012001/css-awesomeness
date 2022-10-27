#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
 
int main(void) {
  int pipefds[2];
 
  if(pipe(pipefds) == -1) {
    perror("pipe");
    exit(EXIT_FAILURE);
  }
 
  printf("Read File Descriptor Value: %d\n", pipefds[0]);
  printf("Write File Descriptor Value: %d\n", pipefds[1]);
 
  return EXIT_SUCCESS;
}
