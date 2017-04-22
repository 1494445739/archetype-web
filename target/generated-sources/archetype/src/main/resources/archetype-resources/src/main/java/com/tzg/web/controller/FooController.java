package com.tzg.web.${package}.controller;

import com.tzg.service.support.proto.ProtoController;
import com.tzg.service.support.proto.ProtoService;

import com.tzg.web.${package}.bean.Foo;
import com.tzg.web.${package}.service.api.FooService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/${package}")
public class FooController extends ProtoController< Foo > { 
	
		private static final Logger logger = LoggerFactory.getLogger( FooController.class );
	
		@Resource
    private FooService fooService;
	
		@Override
    protected ProtoService getService() {
        return fooService;
    }
	
}
