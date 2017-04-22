package com.tzg.webapp.${package}.service.impl;

import com.tzg.service.support.proto.ProtoMapper;
import com.tzg.service.support.proto.ProtoServiceImpl;

import com.tzg.webapp.${package}.bean.Foo;
import com.tzg.webapp.${package}.mapper.FooMapper;
import com.tzg.webapp.${package}.service.api.FooService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class FooServiceImpl extends ProtoServiceImpl< Foo > implements FooService { 

	@Resource
	private FooMapper fooMapper;
	
	@Override
    protected ProtoMapper< Foo > getMapper() {
        return fooMapper;
    }
	
}