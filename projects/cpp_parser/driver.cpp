#include "def.h"
#include <string.h>
#include <bits/stdc++.h>
#include<ctype.h>
#include <fstream>
using namespace std;

vector<string> tokens;
ofstream symboltable ("symbol_table_1.out");
ofstream pa ("pa_1.out");

void tokenize(string str,bool* isComment) {
    //vector<string> tokens;
    string token;



    for(int i=0; i<str.length(); i++)
    {
        if( str[i]=='/' && str[i+1]=='*')
        {
            *isComment=true;
            i++;
            continue;
        }
        if( str[i]=='*' && str[i+1]=='/')
        {
            *isComment=false;
            i++;
            continue;
        }
        if( !*isComment)
        {
        if(str[i] == ' ' || str[i] == '\t' || str[i] == '\n')
        {
            if(token.length() > 0)
            {
                if( token!=" " && token!="\t" && token!="\n")
                {
                    tokens.push_back(token);
                }
                token = "";
            }
        }
        else if(str[i] == '(' || str[i] == ')' || str[i] == '[' || str[i] == ']' || str[i] == '{' || str[i] == '}' || str[i] == ',' || str[i] == ';'  || str[i] == '&' || str[i] == '|' || str[i] == '^' || str[i] == '~' || str[i] == '?')
//|| str[i] == '=' || str[i] == '+' || str[i] == '-' || str[i] == '*' || str[i] == '/' || str[i] == '%' || str[i] == '<' || str[i] == '>' || str[i] == '!'
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            string buff(1, str[i]);
            tokens.push_back( buff );
        }
        else if( str[i] == '=')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("=="), i++;
            else
                tokens.push_back("=");
        }
        else if( str[i] == '+')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("+="), i++;
            else if( str[i+1]== '+')
                tokens.push_back("++"), i++;
            else
                tokens.push_back("+");
        }
        else if( str[i] == '-')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("-="), i++;
            else if( str[i+1]== '-')
                tokens.push_back("--"), i++;
            else
                tokens.push_back("-");
        }
        else if( str[i] == '*')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("*="), i++;
            else
                tokens.push_back("*");
        }
        else if( str[i] == '/')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("/="), i++;
            else
                tokens.push_back("/");
        }
        else if( str[i] == '%')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("%="), i++;
            else
                tokens.push_back("%");
        }
        else if( str[i] == '<')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("<="), i++;
            else
                tokens.push_back("<");
        }
        else if( str[i] == '>')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back(">="), i++;
            else
                tokens.push_back(">");
        }
        else if( str[i] == '!')
        {
            if(token.length() > 0)
            {
                tokens.push_back(token);
                token = "";
            }
            if( str[i+1]== '=')
                tokens.push_back("!="), i++;
            else
                tokens.push_back("!");
        }
        else
        {
            token += str[i];
        }
        }
    }    
    if(token.length() > 0)
    {
        tokens.push_back(token);
    }

    //return tokens;
}




vector<string> inSymbolTable;

bool STContains(string token) {
    
    for (int i = 0; i < inSymbolTable.size(); i++) {
        if (inSymbolTable[i] == token) {
            return true;
        }
    }
    return false;
}

int isKeyword(string token, string toCompare,int value){

if(token.compare(toCompare)==0){
if(!STContains(token)){
    
    symboltable<<token<< " "<< 0<< endl;
    inSymbolTable.push_back(token);
}
return value;
}
return NOTOK;
}

int isIdentifier(string token){

if(!STContains(token)){
    
    symboltable<<token<< " "<< 1<< endl;
    inSymbolTable.push_back(token);
}
return IDNTIFIER;

}

int isIdentifier_Keyword(string token){
if(isKeyword(token,"short",SHORT)>0){
    return SHORT;
}
if(isKeyword(token,"int",INT)>0){
    return INT;
}
if(isKeyword(token,"float",FLOAT)>0){
    return FLOAT;
}
if(isKeyword(token,"double",DOUBLE)>0){
    return DOUBLE;
}
if(isKeyword(token,"bool",BOOL)>0){
    return BOOL;
}
if(isKeyword(token,"char",CHAR)>0){
    return CHAR;
}
if(isKeyword(token,"signed",SIGNED)>0){
    return SIGNED;
}
if(isKeyword(token,"unsigned",UNSIGNED)>0){
    return UNSIGNED;
}
if(isKeyword(token,"for",FOR)>0){
    return FOR;
}
if(isKeyword(token,"while",WHILE)>0){
    return WHILE;
}
if(isKeyword(token,"do",DO)>0){
    return DO;
}
if(isKeyword(token,"return",RETURN)>0){
    return RETURN;
}
if(isKeyword(token,"struct",STRUCT)>0){
    return STRUCT;
}
if(isKeyword(token,"const",CONST)>0){
    return CONST;
}
if(isKeyword(token,"void",VOID)>0){
    return VOID;
}
if(isKeyword(token,"switch",SWITCH)>0){
    return SWITCH;
}
if(isKeyword(token,"break",BREAK)>0){
    return BREAK;
}
if(isKeyword(token,"case",CASE)>0){
    return CASE;
}
if(isKeyword(token,"continue",CONTINUE)>0){
    return CONTINUE;
}
if(isKeyword(token,"goto",GOTO)>0){
    return GOTO;
}
if(isKeyword(token,"long",LONG)>0){
    return LONG;
}
if(isKeyword(token,"static",STATIC)>0){
    return STATIC;
}
if(isKeyword(token,"union",UNION)>0){
    return UNION;
}
if(isKeyword(token,"default",DEFAULT)>0){
    return DEFAULT;
}
if(isKeyword(token,"if",IF)>0){
    return IF;
}
if(isKeyword(token,"else",ELSE)>0){
    return ELSE;
}

if(token[0]=='_' || isalpha(token[0])){
    if(token[1]=='_'){
        return NOTOK;
    }
    else{
        return isIdentifier(token);
     }
}

return NOTOK;
}

int isFloat(string token) {
    bool ans = true;
    int dotcount = 0;
    int i = 0;
    if (token[0] == '+' || token[0] == '-') {
        i = 1;
    }
    for (; i < token.length(); i++) {
        if (!isdigit(token[i]) && token[i]!='.') {
            ans = false;
        }
        if (token[i]=='.') {
            dotcount++;
        }
    }
    if (ans && dotcount==1) {
        return FLO_CONST;
    }
    return NOTOK;
}

int isInt(string token) {
    bool ans = true;
    int i = 0;
    if (token[0] == '+' || token[0] == '-') {
        i = 1;
    }
    for (; i < token.length(); i++) {
        if (!isdigit(token[i])) {
            ans = false;
        }
    }
    if (ans) {
        return INT_CONST;
    }
    return NOTOK;
}

int isArithmetic(string token){
if(token.compare("+")==0){
    return PLUS;
}
if(token.compare("-")==0){
    return MINUS;
}
if(token.compare("*")==0){
    return MULT;
}
if(token.compare("/")==0){
    return DIV;
}
if(token.compare("%")==0){
    return PERCENT;
}
if(token.compare("++")==0){
    return PLUS_PLUS;
}
if(token.compare("--")==0){
    return MINUS_MINUS;
}

return NOTOK;
}

int isRelational(string token){
if(token.compare("<")==0){
    return LESSER;}
if(token.compare(">")==0){
    return GREATER;}
if(token.compare("<=")==0){
    return LESS_EQ;}
if(token.compare(">=")==0){
    return GREAT_EQ;}
if(token.compare("==")==0){
    return EQ_EQ;}

return NOTOK;
}

int isAssignment(string token){
if(token.compare("=")==0){
    return EQ;
}
if(token.compare("+=")==0){
    return PLUS_EQ;
}
if(token.compare("-=")==0){
    return MINUS_EQ;
}
if(token.compare("*=")==0){
    return MULT_EQ;
}
if(token.compare("/=")==0){
    return DIV_EQ;
}


return NOTOK;
}

int isSpecial(string token){
if(token.compare("(")==0){
    return L_PARAEN;
}
if(token.compare(")")==0){
    return R_PARAEN;
}
if(token.compare("{")==0){
    return L_CBRACE;
}
if(token.compare("}")==0){
    return R_CBRACE;
}
if(token.compare("[")==0){
    return L_SQUARE;
}
if(token.compare("]")==0){
    return R_SQUARE;
}
if(token.compare(";")==0){
    return SEMICOL;
}
if(token.compare(",")==0){
    return COMMA;
}

return NOTOK;
}



int main(){
    string s;
    bool isComment=false;
    while( getline(cin, s))
    {
        cout<<s<<endl;
        tokenize(s, &isComment);
    }
    for(int i=0;i<tokens.size();i++)
        {
            int flags[7] = {-1,-1,-1,-1,-1,-1,-1};
            flags[0] = isIdentifier_Keyword(tokens[i]);
            flags[1]= isInt(tokens[i]);
            flags[2]= isFloat(tokens[i]);
            flags[3]= isArithmetic(tokens[i]);
            flags[4]= isRelational(tokens[i]);
            flags[5]= isAssignment(tokens[i]);
            flags[6]= isSpecial(tokens[i]);

            int tokenans = NOTOK;
            for(int j=0;j<7;j++){
                if(flags[j]!=-1){
                    tokenans = flags[j];
                    break;
                }
            }
            //if(tokenans!=NOTOK)
            pa<< tokenans<<" "<<tokens[i]<<endl;
            
        }



    return 0;
}
