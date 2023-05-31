import {buildSchema} from 'graphql'
import { typeDefs } from '../src/schema.js'

test("Should build the schema properly", async ()=>{
    const schema = buildSchema(typeDefs)
    expect(schema).toBeDefined()
});

test("Should have the expected type attrs inside Health type", async ()=>{
    const schema = buildSchema(typeDefs)
    expect(schema).toBeDefined()

    expect(schema.getType('Health').getFields()["status"]).toBeDefined()
    expect(schema.getType('Health').getFields()["status"]["type"].toString()).toStrictEqual("Int")

    expect(schema.getType('Health').getFields()["text"]).toBeDefined()
    expect(schema.getType('Health').getFields()["text"]["type"].toString()).toStrictEqual("String")

    expect(schema.getType('Health').getFields()["version"]).toBeDefined()
    expect(schema.getType('Health').getFields()["version"]["type"].toString()).toStrictEqual("String")
});

test("Should have the expected type attrs inside User type", async ()=>{
    const schema = buildSchema(typeDefs)
    expect(schema).toBeDefined()
    
    expect(schema.getType('User').getFields()['id']).toBeDefined()
    expect(schema.getType('User').getFields()['id']['type'].toString()).toBe('Int')

});