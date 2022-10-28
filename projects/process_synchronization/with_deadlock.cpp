#include <bits/stdc++.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include <time.h>
using namespace std;

sem_t phil_count;
sem_t fork_count[5];
int request[5];  
int finished[5];
int total = 0;

bool deadlock = false;


void *philosopher(void *args){
    int phil = *(int *)args;

    sem_wait(&fork_count[phil]);
    printf("Philosopher %d has acquired the left fork\n", phil);
    request[phil] = phil; // philosopher has acquired the left fork
    sleep(10);
    sem_wait(&fork_count[(phil + 1) % 5]);
    request[(phil + 1) % 5] = phil;
    printf("Philosopher %d has acquired the right fork\n", phil);
    printf("Philosopher %d is eating\n", phil);
    printf("Philosopher %d has finished\n", phil);
    finished[phil] = 1;
    fflush(stdout);
    request[phil] = -1;
    request[(phil + 1) % 5] = -1;
    total++;
    sem_post(&fork_count[(phil + 1) % 5]);
    printf("Philosopher %d has released the right fork\n", phil);
    sem_post(&fork_count[phil]);
    printf("Philosopher %d has released the left fork\n", phil);
    sem_post(&phil_count);
    
    return NULL;
}

void *check_deadlock(){
    while(total < 5)
    {
        for(int i = 0; i < 5; i++)
        {
            if(request[i] != -1)
            {
                if(request[request[i]] == i)
                {
                    deadlock = true;
                    printf("Deadlock detected\n");
                    break;
                }
            }
        }
        if(deadlock)
        {
            break;
        }
    }
}


int main(){
    int p[5];
    pthread_t threads[5];
    sem_init(&phil_count, 0, 5);

    for (int i=0; i<5; i++){
        request[i] = -1;
        finished[i] = 0;
        sem_init(&fork_count[i], 0, 1);
    }


    bool locked = false;
    int victim;
    int i = 0;
    while (total < 5){
        if( finished[i]!= 1)
        {
            p[i] = i;
            srand(time(0));
            int random = rand() % (7);
            if (deadlock && total==4){
                printf("Philosopher %d is eating\n", victim);
                printf("Philosopher %d has finished\n", victim);
                exit(0);
            }
            else{
                int randomt = rand() % (7);
                printf("Philosopher %d thinking for %d seconds\n",i,randomt);
            }

            fflush(stdout);
            sleep(1);
            sem_wait(&phil_count);
            pthread_create(&threads[i], NULL, philosopher, (void *)&p[i]);
            locked = check_deadlock();

            if (locked){
                victim = rand()%5;
                sem_post(&fork_count[victim]);
                pthread_cancel(threads[victim]);
                printf("Preempted Philosopher: %d\n", victim);
                sleep(10);
            }
        }
        i = (i+1)%5;
    }

    for (int i = 0; i < 5; ++i)
    {
        pthread_join(threads[i], NULL);
    }

    return 0;
}