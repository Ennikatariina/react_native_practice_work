import React, { useState } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'persons.db' });//Open database - create if the database does not exist
var tableName="person";//Easier to handle, when table name in one place

//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //tx.executeSql('DROP TABLE IF EXISTS person', []); //uncomment this if needed - sometimes it is good to empty the table
            //By default, primary key is auto_incremented - we do not add anything to that column
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + ' (id INTEGER NOT NULL PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, age INTEGER NOT NULL, archived INTEGER DEFAULT 0);',
            [],//second parameters of execution:empty square brackets - this parameter is not needed when creating table
            //If the transaction succeeds, this is called
            ()=>{
                resolve();//There is no need to return anything
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};
//Add the person's information to the database
const addPerson=(firstname, lastname, age)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into '+tableName+'(firstname, lastname, age) values(?,?,?);',
            //And the values come here
            [firstname, lastname, age],
            //If the transaction succeeds, this is called
            (_, resultSet)=>{
                    resolve(resultSet);
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    console.log(promise)
    return promise;
};

//Calls the addPerson function and handles an error if there are problems saving data
export async function savePerson(firstName, lastName, age){
    try{
      const dbResult = await addPerson(firstName, lastName, age);
      //console.log("dbResult: "+dbResult);//For debugging purposes to see the data in the console screen
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
    console.log('ssavePerson2')
    return 
  }


const fetchAllPerson=()=>{
    console.log('fetchAllPerson')
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from '+tableName, [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    //And add all the items of the result (database rows/records) into that table
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                        //console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                    }
                    //console.log(items);//For debugging purposes to see the data in console window
                    resolve(items);//The data the Promise will have when returned
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export async function readAllPersons(){

    console.log('readAllPersons')
    try{
      const dbResult = await fetchAllPerson();
      return(dbResult); // return json array 
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
    }
  }

  //Delete items from database


export async function deletePersonFromDb(id){
    console.log('deletePersonFromDb')
    try{
      const dbResult = await deletePerson(id);
     
    }
    catch(err){
      console.log(err);
    }
    finally{
      //No need to do anything
    }
    
  }

const deletePerson=(id)=>{
    const promise=new Promise((resolve, reject)=>{
        console.log('delete person')
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('delete from '+tableName+' where id=?;',
            //And the values come here
            [id],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

//Archived
const updateArchived =(id) =>{
  const promise=new Promise((resolve, reject)=>{
    console.log('archived')
    db.transaction((tx)=>{
        //
        tx.executeSql('UPDATE ' +tableName+ ' SET archived = 1 WHERE id = ?;',
        //And the values come here
        [id],
        //If the transaction succeeds, this is called
        ()=>{
                resolve();
        },
        //If the transaction fails, this is called
        (_,err)=>{
            reject(err);
        }
        );
    });
});
return promise;
} 

export async function updateArchivedFromDb(id){
  console.log('updateArchivedFromDb')
  try{
    const dbResult = await updateArchived(id);
   
  }
  catch(err){
    console.log(err);
  }
  finally{
    //No need to do anything
  }
  
}