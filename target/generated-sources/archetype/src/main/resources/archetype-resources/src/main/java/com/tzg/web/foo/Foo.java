package com.tzg.web.${package}.foo;

import com.tzg.service.support.proto.ProtoBean;

import java.io.Serializable;

public class Foo extends ProtoBean implements Serializable {

    private Integer id;

    private String name;

    public Integer getId() { return id; }

    public void setId( Integer id ) { this.id = id; }

    public String getName() { return name; }

    public void setName( String name ) {this.name = name; }

    @Override
    public String toString() {
        return "Foo{" + " id=" + id + ", name=" + name + " }";
    }

}