#include<bits/stdc++.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include <time.h>

using namespace std;

sem_t phil_count;
sem_t fork_[5];


void* philosopher( void *n)
{
    int phil=*(int *)n;

    printf("Philosopher %d is going to eat\n", phil);
    fflush(stdout);
    if( phil%2==0) //if even philosopher; pick left first
    {
        sem_wait(&fork_[phil]);
        printf("Philosopher %d has picked left fork: %d\n", phil, phil);
    }
    sem_wait(&fork_[ (phil+1)%5]);
    printf("Philosopher %d has picked right fork: %d\n", phil, (phil+1)%5);
    
    if( phil%2==1) //if even philosopher; pick left later
    {
        sem_wait(&fork_[phil]);
        printf("Philosopher %d has picked left fork: %d\n", phil, phil);
    }
    printf("Philosopher %d is eating\n", phil);
    fflush(stdout);
    sleep(3);
    printf("Philosopher %d has eaten and kept forks back on the table\n", phil);
    fflush(stdout);

    sem_post( &fork_[ (phil+1)%5]);
    sleep(3);
    sem_post( &fork_[phil]);
    sem_post( &phil_count);

    return NULL;
}


int main()
{
    while(true)
    {
    int i;
    int phil_num[5];
    sem_init(&phil_count, 0, 5);

    for(i=0;i<5;i++)
        sem_init(&fork_[i], 0, 1);
    pthread_t thread_id[5];

    for(i=0;i<5;i++)
    {
        phil_num[i]=i;
        srand(time(NULL));
        int random= rand()%10;
        printf("Philosopher %d is thinking for %d seconds\n", i , random);
        fflush(stdout);
        sleep(random);
        sem_wait(&phil_count);
        pthread_create(&thread_id[i], NULL, philosopher, (void *)&phil_num[i]);
    }

    for(i=0;i<5;i++)
        pthread_join(thread_id[i], NULL);
    return 0;
}}