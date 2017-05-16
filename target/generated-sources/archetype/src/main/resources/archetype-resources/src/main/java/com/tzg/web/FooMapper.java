package com.tzg.web.${package};

import com.tzg.service.support.proto.ProtoMapper;

import org.springframework.stereotype.Repository;

@Repository
public interface FooMapper extends ProtoMapper< Foo > { }
