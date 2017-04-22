package com.tzg.webapp.${package}.mapper;

import com.tzg.service.support.proto.ProtoMapper;

import com.tzg.webapp.${package}.bean.Foo;

import org.springframework.stereotype.Repository;

@Repository
public interface FooMapper extends ProtoMapper< Foo > { }
