#ifndef _Y_TAB_H
#define _Y_TAB_H

/* Tokens: identifier, integer constant, floating-point constant, 
           && || ~ == < <= > >= != + - * / ( ) {  } , ; = int float
           for do else  if print scan while

 */
#define IDNTIFIER 300
#define INT_CONST 301
#define FLO_CONST 302

#define PLUS      312
#define MINUS     313
#define MULT      314
#define DIV       315
#define PERCENT   303
#define PLUS_PLUS 304
#define MINUS_MINUS 305

#define EQ        311
#define PLUS_EQ   316
#define MINUS_EQ  317
#define MULT_EQ   318
#define DIV_EQ    319

#define EQ_EQ     306
#define LESSER    307
#define LESS_EQ   308
#define GREATER   309
#define GREAT_EQ  310

#define L_SQUARE  414
#define R_SQUARE  415
#define L_PARAEN  416
#define R_PARAEN  417
#define L_CBRACE  418
#define R_CBRACE  419
#define COMMA     420
#define SEMICOL   421

#define SHORT     422
#define INT       423
#define FLOAT     424
#define DOUBLE    425
#define BOOL      426
#define CHAR      427
#define SIGNED    428
#define UNSIGNED  429
#define FOR       430
#define WHILE     431
#define DO        432
#define RETURN    433
#define STRUCT    434
#define CONST     435
#define VOID      436
#define SWITCH    437
#define BREAK     438
#define CASE      439
#define CONTINUE  440
#define GOTO      441
#define LONG      442
#define STATIC    443
#define UNION     444
#define DEFAULT   445
#define IF        475
#define ELSE      476

#define NOTOK     -1


typedef union {
       char *string;
       int integer;
       float real;
} attrType;

#endif
