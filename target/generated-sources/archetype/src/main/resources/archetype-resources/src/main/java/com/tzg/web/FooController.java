package com.tzg.web.${package};

import com.tzg.service.support.proto.ProtoController;
import com.tzg.service.support.proto.ProtoService;

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
