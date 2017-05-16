package com.tzg.web.${package}.foo;

import com.tzg.service.support.proto.ProtoMapper;
import com.tzg.service.support.proto.ProtoServiceImpl;

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