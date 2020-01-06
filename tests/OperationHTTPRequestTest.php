<?php
require_once(__DIR__.'/../app/lib/autoload.php');

use \PHPUnit\Framework\TestCase;
use App\Operation\OperationHTTPRequest;

class OperationHTTPRequestTest extends TestCase
{
    protected $object;
    protected $testdata = [
        'actionType'    =>  'change',
        'dirname'       =>  'testdir',
        'name'          =>  'testname',
        'level'         =>  2,
        'filename'      =>  null,
        'content'       =>  null,
        'cliped'        =>  null,
    ];

    protected function setUp(): void
    {
        $this->object = new OperationHTTPRequest();
        $reflection = new \ReflectionClass($this->object);
        $props = $reflection->getProperties(ReflectionProperty::IS_PRIVATE);
        foreach ($props as $prop) {
            $propname = $prop->getName();
            $prop->setAccessible(true);
            $prop->setValue($this->object, $this->testdata[$propname]);
        }
    }

    public function testGetActionType()
    {
        $test = $this->object->getActionType();
        $expected = $this->testdata['actionType'];
        $this->assertEquals($expected, $test);
    }

    public function testSetProperties()
    {
        $test = [];

        $testobject = new OperationHTTPRequest();
        $testobject->setProperties($this->testdata);
        $reflection = new \ReflectionClass($testobject);
        $properties = $reflection->getProperties(ReflectionProperty::IS_PRIVATE);

        foreach ($properties as $property) {
            $property->setAccessible(true);
            $test[$property->getName()] = $property->getValue($testobject);
        }

        $expected = $this->testdata;

        $this->assertEquals($expected, $test);
    }

    public function testGetValues()
    {
        $test = [];
        $expected = [];

        $testArgs = [
            'actionType',
            'dirname',
            'level',
        ];
        $test = $this->object->getValues($testArgs);

        foreach ($this->testdata as $propname => $param) {
            if ($propname === 'actionType'
            ||	$propname === 'dirname'
            ||	$propname === 'level') {
                $expected[] = $this->testdata[$propname];
            }
        }

        $this->assertEquals($expected, $test);
    }

    public function testAll()
    {
        $test = $this->object->All();
        $expected = $this->testdata;

        $this->assertEquals($expected, $test);
    }
}
